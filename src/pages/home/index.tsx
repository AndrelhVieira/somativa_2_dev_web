import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  if (!userData) {
    return (
      <div>
        <p>Favor autenticar para acessar essa página</p>
        <button onClick={handleLogin}>Ir para login</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Bem-vindo, {userData.name}!</h1>
      <p>Sobrenome: {userData.surname}</p>
      <p>Data de Nascimento: {userData.birthdate}</p>
    </div>
  );
}
