import styled from 'styled-components';

export const Container = styled.div`
  #page-content-wrapper {
    min-width: 100vw;
  }
  .modal {
    display: block;
    position: unset;
    .modal-body {
      max-height: 500px;
    }
    .modal-dialog {
      max-width: 900px !important;
    }
  }
  .btn {
    width: 200px;
    font-size: 15px;
    padding: 10px;
    i {
      margin-right: 5px;
    }
  }
  .user-list {
    margin-top: 40px;
    list-style: none;
    font-size: 18px;
    li {
      margin-top: 5px;
      input {
        margin-top: 0.6rem;
      }
    }
  }

  @media (min-width: 768px) {
    #page-content-wrapper {
      min-width: 0;
      width: 100%;
    }
  }
`;
