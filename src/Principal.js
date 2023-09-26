import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { Button, Container, Typography, Paper, Grid } from '@mui/material'; // Importe os componentes do Material-UI

function Principal() {
  const { state } = useLocation();
  const usuario = state && state.usuario;
  const navigate = useNavigate();

  // Função para formatar a data no formato brasileiro
  const formatarDataBrasileira = (data) => {
    return format(new Date(data), 'dd/MM/yyyy');
  };

  const handleLogout = () => {
    // Implemente a função para fazer logout aqui, por exemplo, usando o Firebase
    // Após fazer logout, redirecione para a página de login
    navigate('/');
  };

  // Verifique se o usuário está autenticado
  if (!usuario) {
    toast.error('Usuário não autenticado. Redirecionando para a página de login...');
    // Se não estiver autenticado, redirecione para a página de login
    // Redirecione para a página de login após um pequeno atraso
    setTimeout(() => {
      navigate('/');
    }, 3000); // Redireciona após 3 segundos (ajuste conforme necessário)

    return null; // Evita que o restante do conteúdo seja renderizado
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // Define a altura mínima da tela inteira
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h4" align="center">Bem-vindo, {usuario.nome} {usuario.sobrenome}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="center">Data de Nascimento: {formatarDataBrasileira(usuario.dataNascimento)}</Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <Button variant="contained" color="primary" onClick={handleLogout}>
                Logout
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default Principal;