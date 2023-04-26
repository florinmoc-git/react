import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request}){
  // cannot use useSearchParams as we are not in a component
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';
  if(mode !== 'login' && mode !== 'signup'){
    throw json({message: 'Unsuported mode!'}, {status: 422});
  }
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password')
  }
  const response = await fetch('http://localhost:8080/' + mode,{
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(authData)
  })
  if(response.status === 401 || response.status === 422){
    return response;
  }
  if(!response.ok){
    throw json({message: 'Could not authenticate user!'}, {status: 500});
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem('token', token);
  const expiration = new Date();
  console.log('expiration > ' + expiration)
  expiration.setHours(expiration.getHours() + 1);
  console.log('expiration + 1 > ' + expiration)
  localStorage.setItem('expiration', expiration.toISOString())

  return redirect('/');
}