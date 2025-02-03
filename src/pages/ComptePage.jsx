import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import AuthContext from "../context/AuthContext";

function ComptePage() {
//   const { user } = useContext(AuthContext);
    console.log("ComptePage");

return <Container>
    <h1>Mon Compte</h1>
    <p>Bienvenue ${user.prenom} ${user.nom}</p>     
    </Container>
    }
    
    export default ComptePage;