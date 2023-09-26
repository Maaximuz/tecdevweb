import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, loginSistema } from './firebase'; // Importe a instância do Firebase Authentication
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, TextField, Container, Typography, Grid, CssBaseline } from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false); // Estado para controlar o erro de e-mail
  const [erro, setErro] = useState('');
  const navigate = useNavigate(); // Use o hook useHistory para obter a instância history

  const handleLogin = async () => {
    try {
    setErro(''); // Limpar mensagens de erro

    // Validar e-mail e senha (você pode adicionar outras validações, se necessário)
    if (!email || !password) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    // Fazer login com e-mail e senha no Firebase Authentication
    const authentication = await loginSistema(auth, email, password);
    console.log(authentication);
    // Obter os dados do usuário do Firestore
    if (authentication) {
      
      toast.success('Login efetuado com sucesso');

      const usuario = authentication;
      
      // Redirecionar para a página de login após um pequeno atraso
      setTimeout(() => {
        navigate('/principal', {state: {usuario}});
      }, 3000); // Redirecionar após 3 segundos (3000 milissegundos)
    }
    } catch (error) {
    // Se houver um erro no login, exiba uma mensagem de erro com o react-toastify
    toast.error('Usuário não cadastrado ou senha incorreta. Verifique seus dados e tente novamente.');
    setErro(error.message);
    }
  };

  const handleClear = () => {
    setEmail('');
    setPassword('');
    setEmailError(false); // Limpar o estado de erro de e-mail
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20vh' }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError} // Aplicar estilo de erro se emailError for true
            helperText={emailError ? 'E-mail inválido' : ''}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Grid container spacing={2} style={{ marginTop: '20px' }}>
            <Grid item xs={6}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogin}
              >
                Entrar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleClear}
              >
                Limpar
              </Button>
            </Grid>
          </Grid>
          {erro && <div className="erro">{erro}</div>}
          <Grid container justifyContent="flex-end" style={{ marginTop: '10px' }}>
            <Grid item>
              <Link to="/Cadastro">Não tem uma conta? Cadastre-se</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;