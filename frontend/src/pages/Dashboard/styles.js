import styled from 'styled-components';

export const Container = styled.div`
  .analitycs-cards {
    justify-content: space-around !important;
    .chart-card-content {
      height: 330px;
    }
  }
  #page-content-wrapper {
    min-width: 100vw;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: 0;
  }

  @media (min-width: 768px) {
    #sidebar-wrapper {
      margin-left: 0;
    }

    #page-content-wrapper {
      min-width: 0;
      width: 100%;
    }

    #wrapper.toggled #sidebar-wrapper {
      margin-left: -15rem;
    }
  }
`;
