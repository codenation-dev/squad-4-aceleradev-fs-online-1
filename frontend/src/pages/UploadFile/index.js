import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import {
  Container, UploadBox, DropContainer, UploadMessage,
} from './styles';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

export default class UploadFile extends Component {
  state = {
    files: [],
    uploadError: false,
  };

  onDrop = (files) => {
    if (files.length !== 0) {
      this.setState({ files });
      this.setState({ uploadError: false });
    } else {
      this.setState({ uploadError: true });
    }
  };

  renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return <UploadMessage>Arraste seu arquivo aqui... </UploadMessage>;
    }
    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado </UploadMessage>;
    }
    return <UploadMessage type="success">Solte seu arquivo aqui</UploadMessage>;
  };

  render() {
    const { files, uploadError } = this.state;

    const handleFile = files.map(f => (
      <li key={f.name}>
        {f.name} - {f.size} bytes
      </li>
    ));

    return (
      <Container>
        <div className="d-flex" id="wrapper">
          <Sidebar />
          <div id="page-content-wrapper">
            <Navbar />
            <div className="container-fluid">
              <div className="card main-content mt-4 p-4 ">
                <div className="row justify-content-between mr-5 ml-5 mb-2">
                  <h3>Importar CSV</h3>
                </div>
                <div className="row justify-content-between mr-5 ml-5">
                  <UploadBox>
                    <Dropzone accept="text/*," onDrop={this.onDrop}>
                      {({
                        getRootProps, getInputProps, isDragActive, isDragReject,
                      }) => (
                        <section className="container">
                          <DropContainer
                            {...getRootProps({ className: 'dropzone' })}
                            isDragActive={isDragActive}
                            isDragReject={isDragReject}
                          >
                            <input {...getInputProps()} />
                            {this.renderDragMessage(isDragActive, isDragReject)}
                          </DropContainer>
                          {uploadError ? (
                            <aside>
                              <h4>Arquivo selecionado:</h4>
                              <span>Falha ao realizar upload, tente novamente.</span>
                            </aside>
                          ) : (
                            <aside>
                              <h4>Arquivo selecionado:</h4>
                              <ul>{handleFile}</ul>
                            </aside>
                          )}
                          <aside>
                            <button
                              className="btn btn-dark bg-dark-blue float-right"
                              disabled={files.length === 0}
                            >
                              <i className="fa fa-search" /> Analisar dados
                            </button>
                          </aside>
                        </section>
                      )}
                    </Dropzone>
                  </UploadBox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
