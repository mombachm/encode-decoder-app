### Encoder Decoder
________
#### Pré requisitos:
- Node
- yarn
________
#### Instalação:
- faça o clone do repositório: 
```bash
git clone https://github.com/mombachm/encoder-decoder-app.git
```
- execute o comando yarn para instalação de dependências: 
```bash
yarn install
```
________
#### Utilização:

##### Codificação
- Para codificar um arquivo, na pasta raiz do projeto, executar o seguinte comando via terminal:
```bash
yarn encode [CAMINHO PARA O ARQUIVO]
```
Exemplo:
```bash
yarn encode test-files/alice29.txt
```

Obs: Já existem alguns arquivos de teste na pasta ```test-files``` do projeto.
- Selecione o tipo de encoding type que deseja utilizar para codificar o arquivo:
![alt text](https://github.com/mombachm/encoder-decoder-app/edit/master/source/images/encoding-types.png "Encoding Types")
Obs: Para o encoding type Golomb, é necessário informar o divisor utilizado na codificação após a seleção do encoding type.

- Após a seleção do encoding type, o arquivo será codificado e salvo no mesmo diretório do arquivo de origem com a extensão .cod (```<arquivo-origem>.cod```):
![alt text](https://github.com/mombachm/encoder-decoder-app/edit/master/source/images/encoding-finished.png "Encoding Finished")

##### Decodificação
- Para codificar um arquivo, na pasta raiz do projeto, executar o seguinte comando via terminal:
```bash
yarn decode [CAMINHO PARA O ARQUIVO CODIFICADO]
```
Exemplo:
```bash
yarn decode test-files/alice29.cod
```

- O encoding type do arquivo será detectado através da informação contida no header e será salvo o arquivo decodificado no mesmo diretório do arquivo de origem com a extensão .dec (```<arquivo-origem>.dec```):
![alt text](https://github.com/mombachm/encoder-decoder-app/edit/master/source/images/decoding.png "Decoding")

________
#### Dependências Utilizadas:
  - devDependencies:
    - @types/node
    - @types/terminal-kit
    - app-root-path
    - typescript
    
  - dependencies:
    - terminal-kit

