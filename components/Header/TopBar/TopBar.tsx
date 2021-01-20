import { Col, Row } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import globalStyles from '../../../styles/globalStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import userLogout from '../../../lib/requests/mutators/userLogout';
import { useRouter } from 'next/router';
import React from 'react';
import axios from 'axios';
import { setupMaster } from 'cluster';
interface Props {
  loggedIn: boolean;
  logoutUser: () => void;
}
export default function TopBar({ loggedIn, logoutUser }: Props) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState('');
  return (
    <>
      <Row className={`${globalStyles.primaryBg} justify-content-md-center`} style={{ height: '65px', minWidth: '100%' }}>
        <Col xs="3" className="my-auto">
          {loggedIn ? (
            <h5
              className="text-center hoverable"
              onClick={async () => {
                try {
                  await userLogout();
                  logoutUser();
                  router.replace('/');
                } catch (err) {}
              }}
              style={{ whiteSpace: 'nowrap' }}
            >
              LOG OUT
            </h5>
          ) : (
            <Link href="/login">
              <h5 className="text-center hoverable" style={{ whiteSpace: 'nowrap' }}>
                LOG IN
              </h5>
            </Link>
          )}
        </Col>
        <Col xs="6" className="text-center my-auto">
          <>
            <Link href="/">
              <div className="text-center">
                <Image className="hoverable" src="/logo-black.png" alt="DPentagon Logo" width={35} height={35} />
              </div>
            </Link>

            <Link href="/">
              <h5 className="hoverable text-center" style={{ fontWeight: 'bold', fontFamily: 'Athelas', whiteSpace: 'nowrap' }}>
                D.PENTAGON
              </h5>
            </Link>
          </>
        </Col>
        <Col xs="3" className="my-auto text-center" style={{ overflow: 'auto' }}>
          <form
            id="demo-2"
            onSubmit={e => {
              e.preventDefault();
              router.replace(`/?caption=${searchTerm}`);
              setSearchTerm('');
            }}
          >
            <input
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
              }}
            />
          </form>
          {/* <FontAwesomeIcon size="2x" color="#000000" icon={faSearch} /> */}
        </Col>
      </Row>
      <style jsx>{`
        input {
          outline: none;
        }
        input[type='search'] {
          -webkit-appearance: textfield;
          -webkit-box-sizing: content-box;
          font-family: inherit;
          font-size: 100%;
        }
        input::-webkit-search-decoration,
        input::-webkit-search-cancel-button {
          display: none;
        }

        input[type='search'] {
          background: #ededed url(https://static.tumblr.com/ftv85bp/MIXmud4tx/search-icon.png) no-repeat 9px center;
          border: solid 1px #e9dccc;
          padding: 9px 10px 9px 32px;
          width: 55px;

          -webkit-border-radius: 10em;
          -moz-border-radius: 10em;
          border-radius: 10em;

          -webkit-transition: all 0.5s;
          -moz-transition: all 0.5s;
          transition: all 0.5s;
        }

        input[type='search']:focus {
          width: 130px;
          background-color: #fff;
          border-color: #000;
          -webkit-box-shadow: 0 0 5px rgba(109, 207, 246, 0.5);
          -moz-box-shadow: 0 0 5px rgba(109, 207, 246, 0.5);
          box-shadow: 0 0 5px rgba(109, 207, 246, 0.5);
        }

        input:-moz-placeholder {
          color: #e9dccc;
        }
        input::-webkit-input-placeholder {
          color: #e9dccc;
        }

        /* Demo 2 */
        #demo-2 input[type='search'] {
          width: 15px;
          padding-left: 10px;
          color: transparent;
          cursor: pointer;
          background-color: #e9dccc;
        }

        #demo-2 input[type='search']:focus {
          width: 130px;
          padding-left: 32px;
          color: #000;
          background-color: #fff;
          cursor: auto;
        }
        #demo-2 input:-moz-placeholder {
          color: transparent;
        }
        #demo-2 input::-webkit-input-placeholder {
          color: transparent;
        }
      `}</style>
    </>
  );
}
