import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars0.githubusercontent.com/u/48866117?s=460&u=536953a544240f4f91b2ff0d9e5e1cbc9d11bc93&v=4" alt="Marques Yuri de Souza"/>
        <div>
          <strong>Marques Yuri de Souza</strong>
          <span>Química</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias de química avançada.
        <br/><br/>
        Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.
      </p>

      <footer>
        <p>Preço/Hora <strong>R$ 80,00</strong></p>
        <button className="button">
          <img src={ whatsappIcon } alt="Whatsapp"/>
          Entrar em contato
        </button>
      </footer>
    </article>
  )
}

export default TeacherItem