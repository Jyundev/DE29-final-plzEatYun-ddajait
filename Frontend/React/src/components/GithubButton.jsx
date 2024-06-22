import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { auth } from "../filebase";
import styled from "styled-components";

function GithubButton() {

    const navigate = useNavigate();
    const onClick = async () => {
        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/");
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Button onClick={onClick}>
            <Logo src="\public\github-logo.svg" alt="github" /> 
            Continue with Github
        </Button>
    )
}

export default GithubButton

const Button = styled.span`
    background-color: white;
    font-weight: 500;
    width: 90%;
    color: black;
    padding: 10px 20px;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    cursor: pointer;
`;

const Logo = styled.img`
    height: 25px;
`;