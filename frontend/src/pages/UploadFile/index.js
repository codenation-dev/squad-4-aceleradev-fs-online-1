import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { fileUpload } from '../../services/uploadService';
import MessageComponent from '../../components/message/index'

import {
  Container, UploadBox, DropContainer, UploadMessage,
} from './styles';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

export default class UploadFile extends Component {

  state = {
    files: [],
    uploadError: false,
    message: '',
    messageClass: 'hidden',
  };

  onDrop = (files) => {
    if (files.length !== 0) {
      this.setState({ files });
      this.setState({ uploadError: false });
    } else {
      this.setState({ uploadError: true });
      alert('Erro ao realizar o upload')
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

  handleUpload = (e) => {
    e.preventDefault();

    console.log(this.state.files);

    if (!this.state.uploadError) {
      fileUpload(this.state.files).then((response) => {
      }).catch((error) => {
        console.log(error)
        alert('Ocorreu um erro ao realizar upload');
      });
    }    
    this.setState({ message: 'O arquivo foi importado com sucesso. O servidor irá processá-lo, isso pode demorar alguns minutos', messageClass: 'success-message'});
  }

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
              <MessageComponent text = {this.state.message} classe = {this.state.messageClass}/>
              <br/>
                <div className="row justify-content-between mr-5 ml-5 mb-2">
                  <h3>Importar CSV</h3>
                </div>
                <div className="row justify-content-between mr-5 ml-5">
                  <UploadBox>
                    <Dropzone accept=".csv,text/csv" onDrop={this.onDrop}>
                      {({
                        getRootProps, getInputProps, isDragActive, isDragReject,
                      }) => (
                        <section className="container">
                          <form onSubmit={this.handleUpload}>
                            <DropContainer
                              {...getRootProps({ className: 'dropzone' })}
                              isDragActive={isDragActive}
                              isDragReject={isDragReject}
                            >
                              <input {...getInputProps()} name="file" />
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
                              type="submit"
                              className="btn btn-dark bg-dark-blue float-right"
                              disabled={files.length === 0}
                            >
                              <i className="fa fa-search" /> Analisar dados
                            </button>
                          </aside>
                          </form>
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