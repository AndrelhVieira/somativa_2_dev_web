import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    birthdate: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (
      !form.email ||
      !form.password ||
      !form.name ||
      !form.surname ||
      !form.birthdate
    ) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "usuarios", uid), {
        uid,
        name: form.name,
        surname: form.surname,
        birthdate: form.birthdate,
        email: form.email,
      });

      alert("Usuário cadastrado com sucesso!");
    } catch (error: any) {
      console.error(error);

      switch (error.code) {
        case "auth/email-already-in-use":
          alert("Este e-mail já está cadastrado.");
          break;
        case "auth/invalid-email":
          alert("E-mail inválido.");
          break;
        case "auth/weak-password":
          alert("A senha deve ter pelo menos 6 caracteres.");
          break;
        default:
          alert("Erro ao cadastrar: " + error.message);
      }
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Senha"
        onChange={handleChange}
      />
      <input name="name" placeholder="Nome" onChange={handleChange} />
      <input name="surname" placeholder="Sobrenome" onChange={handleChange} />
      <input name="birthdate" type="date" onChange={handleChange} />
      <button onClick={handleRegister}>Cadastrar</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
