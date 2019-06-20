import styled, { css } from 'styled-components';

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
export const UploadBox = styled.div`
  width: 100%;
  background-color: #fff;
  font-size: 18px;
  color: #111;
  font-weight: 400;
  label {
    margin-right: 10px;
  }
  aside {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    i {
      margin-right: 5px;
    }

    h4 {
      margin-top: 10px;
    }
    ul {
      list-style: none;
    }
  }
`;

const dragActive = css`
  border-color: #78e5d5;
`;
const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
  className: 'dropzone',
})`
  margin-top: 30px;
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: height 0.2s ease;
  ${props => props.isDragActive && dragActive};
  ${props => props.isDragReject && dragReject};
`;
const messageColors = {
  default: '#2b2d3d',
  error: '#e57878',
  success: '#78e5d5',
};

export const UploadMessage = styled.p`
  display: flex;
  color: ${props => messageColors[props.type || 'default']};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;
