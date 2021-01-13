import { Container } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import TopBar from '../Header/TopBar/TopBar';

export default function Layout(props) {
  return (
    <Container fluid>
      <TopBar></TopBar>
      {props.children}
      <Footer></Footer>
    </Container>
  );
}
