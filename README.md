# CODEZ

CLI para auxiliar na criação e padronização de projetos utilizando melhores praticas de arquitetura de software e padrão de código.

### Conceitos

Está CLI utiliza de conceitos de arquitetura de software e padrão de código, voltados para o Clean Architecture de Uncle Bob.

![Clean Architecture](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

Vamos sintetizar a geração de arquivos na seguinte estrutura:
```
core
  ├─application 
  │ └─... (Onde ficaram as implementações dos casos de uso)
  ├─domain
  │ ├─entities 
  │ │ └─... (Interface de entidades)
  │ ├─repositories 
  │ │ └─... (Interfaces de repositorio)
  │ ├─use-cases 
  │ │ └─... (Interface de caso de uso)
  └─infrastructure 
    └─ ... (Camada suja - Frameworks, libs e mais)
```


# License

MIT - see LICENSE