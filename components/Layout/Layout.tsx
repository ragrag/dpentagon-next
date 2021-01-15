import { Container } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import TopBar from '../Header/TopBar/TopBar';

export default function Layout(props) {
  return (
    <Container fluid style={{ minHeight: '100%' }}>
      <TopBar></TopBar>
      <br></br>
      {props.children}
      <Footer></Footer>
    </Container>
  );
}
