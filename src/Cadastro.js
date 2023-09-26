import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Grid, CssBaseline } from '@mui/material';
import { cadastrarUsuario } from './firebase'; // Importe o Firebase configurado
import InputMask from 'react-input-mask'; // Importe a biblioteca de máscaras
import { toast } from 'react-toastify';

function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  // Função para verificar se todos os campos obrigatórios foram preenchidos
  const camposObrigatoriosPreenchidos = () => {
    return email.trim() !== '' && senha.trim() !== '' && nome.trim() !== '' && sobrenome.trim() !== '' && dataNascimento.trim() !== '';
  };

  // Regex para validar um e-mail válido
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  // Função para verificar a força da senha
  const isSenhaSegura = (senha) => {
    // Verificar se a senha tem pelo menos 8 caracteres
    if (senha.length < 8) {
      return 'A senha deve conter pelo menos 8 caracteres.';
    }
  
    // Verificar se a senha contém pelo menos uma letra maiúscula
    if (!/[A-Z]/.test(senha)) {
      return 'A senha deve conter pelo menos uma letra maiúscula.';
    }
  
    // Verificar se a senha contém pelo menos uma letra minúscula
    if (!/[a-z]/.test(senha)) {
      return 'A senha deve conter pelo menos uma letra minúscula.';
    }
  
    // Verificar se a senha contém pelo menos um número
    if (!/[0-9]/.test(senha)) {
      return 'A senha deve conter pelo menos um número.';
    }
  
    return null; // Retorna null se a senha for válida
  };
  
  const handleCadastro = async () => {
    try {
      setErro(''); // Limpar mensagens de erro
  
      // Verificar se todos os campos obrigatórios foram preenchidos
      if (!camposObrigatoriosPreenchidos()) {
        setErro('Todos os campos são obrigatórios.');
        return;
      }
    
      // Validar e formatar a data de nascimento (dd/mm/yyyy)
      const dataNascimentoFormatted = dataNascimento
        .split('/')
        .reverse()
        .join('-');
  
      // Validar o e-mail com regex
      if (!emailRegex.test(email)) {
        setErro('E-mail inválido.');
        return;
      }
  
      // Validar a senha
      const senhaErro = isSenhaSegura(senha);
      if (senhaErro) {
        setErro(senhaErro);
        return;
      }
  
      // Criar o usuário com e-mail e senha usando 'auth'
      const userCredentials = await cadastrarUsuario(email, senha, nome, sobrenome, dataNascimentoFormatted);
      console.log(userCredentials);
      if (userCredentials) {
        // Exibir uma notificação de sucesso
        toast.success('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');

        // Redirecionar para a página de login após um pequeno atraso
        setTimeout(() => {
          navigate('/');
        }, 3000); // Redirecionar após 3 segundos (3000 milissegundos)
      } else {
        console.error('O objeto de usuário é undefined.');
      }

    } catch (error) {
      setErro(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20vh' }}>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
        <form style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="nome"
            label="Nome"
            name="nome"
            autoComplete="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="sobrenome"
            label="Sobrenome"
            name="sobrenome"
            autoComplete="sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            required
          />
          <InputMask
            mask="99/99/9999"
            maskPlaceholder="dd/mm/yyyy"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          >
            {() => (
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="dataNascimento"
                label="Data de Nascimento"
                name="dataNascimento"
                autoComplete="dataNascimento"
                required
              />
            )}
          </InputMask>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="senha"
            label="Senha"
            type="password"
            id="senha"
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <Grid container spacing={2} style={{ marginTop: '20px' }}>
            <Grid item xs={6}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleCadastro}
              >
                Cadastrar
              </Button>
            </Grid>
          </Grid>
          {erro && (
            <Typography color="error" style={{ marginTop: '10px' }}>
              {erro}
            </Typography>
          )}
          <Grid container justifyContent="flex-end" style={{ marginTop: '10px' }}>
            <Grid item>
              <Link to="/">Já tem uma conta? Faça login</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Cadastro;