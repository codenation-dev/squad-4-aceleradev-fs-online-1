import styled from 'styled-components';

export const Container = styled.div`
  #page-content-wrapper {
    min-width: 100vw;
  }
  .modal {
    display: block;
    position: unset;
    .modal-header {
      padding-bottom: 0;
      .btn {
        font-size: 15px;
        padding: 10px;
      }
    }

    .modal-body {
      max-height: 500px;
    }
    .modal-dialog {
      max-width: 900px !important;
    }
  }

  @media (min-width: 768px) {
    #page-content-wrapper {
      min-width: 0;
      width: 100%;
    }
  }
`;
