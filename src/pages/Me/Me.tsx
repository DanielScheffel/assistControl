import { LuClipboardCheck, LuUser } from "react-icons/lu";

import { getUserFromToken } from "../../utils/getUserFromToken";

import {
  Container,
  Welcome,
  WelcomeCard,
  Illustration,
  CardContent,
  Divider,
  Profile,
  ProfileIcon,
  ProfileInfo,
  ProfieContent,
} from "./styles";

export default function Me() {
  const user = getUserFromToken();

  return (
    <Container>
      <Welcome>
        <h1>Olá, {user?.nome ?? "Usuário"}! 👋</h1>

        <p>
          Bem-vindo ao <span>AssistControl</span>
        </p>

        <p>Sistema de Controle de Assistências</p>
      </Welcome>

      <WelcomeCard>
        <Illustration>
          <LuClipboardCheck size={170} />
        </Illustration>

        <CardContent>
          <h2>Seu ambiente está pronto.</h2>

          <p>
            Aqui você gerencia fornecedores, produtos e assistências de forma
            simples, rápida e eficiente.
          </p>
        </CardContent>


        <Profile>
          <Divider />
          <ProfieContent>
          <ProfileIcon>
            <LuUser size={30} />
          </ProfileIcon>

          <ProfileInfo>
            <span>Perfil</span>
            <strong>{user?.tipo_usuario ?? "Perfil"}</strong>
          </ProfileInfo>
          </ProfieContent>
        </Profile>
      </WelcomeCard>
    </Container>
  );
}