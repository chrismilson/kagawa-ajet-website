import React from 'react'
import Page from './Page'
import './Home.scss'
import udonnw from './public/images/udonnwkama.png'

const content = [
  'Welcome to the Kagawa AJET website! This site is for new, existing and alumni JETs, as well as anybody else who might want to find out more about udon-ken.',
  "Once known as Sanuki province, Kagawa is Japan's smallest prefecture on the north of Shikoku. It is famous for many things, such as udon, paper fans, modern art, chicken (yes, chicken) and more!",
  "We also have the longest covered arcade shopping mall in Japan, as well the lowest amount of rainfall, but we won't boast our record on traffic accidents...",
  'Kagawa and its islands are home to the triannual contemporary art festival, the Setouchi Triennale (also known as the Setouchi International Art Festival). The next one is set to take place in 2019.',
  'We hope you find the information on this site useful, and that you make your most out of your time in Kagawa. If you have any suggestions, recommendations, or if you just want to shower us with praise, then please get in touch!'
]

function Home (props) {
  return (
    <Page>
      <div className='Home'>
        <div id='udonnw' className='col'>
          <img src={udonnw} alt='Udon Brain' />
        </div>
        <div className='col text'>
          {
            content.map((p, idx) => (<p key={idx}>{p}</p>))
          }
        </div>
      </div>
    </Page>
  )
}

export default Home
