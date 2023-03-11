/*

*/
function navigationOnText() {

  const classFocusableSection = 'focusable-section';
  const classFocusableChild = 'focusable-child';

  const focusableSection = document.querySelectorAll('.focusable-section')

  const body = document.getElementsByTagName('body')

  body[0].addEventListener('keydown', (e) => {
    if(e.key === 'Tab') {
      let activeElement = document.activeElement;
      if((activeElement.classList.contains(classFocusableSection)) ||
      (activeElement.classList.contains(classFocusableChild))) {
        return false
      } else {
        let siblings = activeElement.sib
        for(let i = 0; i < focusableSection.length; i++) {
          focusableSection[i].setAttribute('tabindex', '0')
        }
      }

    }
  })

  body[0].addEventListener('click', (e) => {
    for(let i = 0; i < focusableSection.length; i++) {
      focusableSection[i].setAttribute('tabindex', '0')
      focusableSection[i].classList.remove('focused-parent')
    }
    let activeElement = document.activeElement
    //let parent  
  })

  // Atribui eventos às seçoes focáveis
  for(let i = 0; i < focusableSection.length; i++) {

    let indice = 0;
    let numeroOfParents = focusableSection.length;

    // Atribui o evento "focus"
    focusableSection[i].addEventListener('focus', (e) => {
      
      let section = e.target;
      
      // Encontra todos os filhos que são focáveis
      const focusableChild = e.target.querySelectorAll('.focusable-child');
      
      if(focusableChild.length != 0) {

        let index = 0;
        const numberOfChildren = focusableChild.length;

        for(let i = 0; i < focusableSection.length; i++) {
          focusableSection[i].setAttribute('tabindex', '0')
        }

        // A tabulação do elemento pai é removida
        section.setAttribute('tabindex', '-1')


        // Ativa a tabulação nos elementos filhos da seção que tem o foco
        for(let i = 0; i < focusableChild.length; i++) {

          focusableChild[i].setAttribute('tabindex', '0')
          

          if(i === 0) {
            focusableChild[i].classList.add('focused-child')
            focusableChild[i].focus();
            section.classList.add('focused-parent')
          }

          focusableChild[i].addEventListener('focus', () => {
            section.classList.add('focused-parent')
          })

          focusableChild[i].addEventListener('keydown', (e) => {

            //let child = e.target
            let child = focusableChild[i]

            if(e.key === "ArrowUp") {
              if(index > 0) {
                focusableChild[index].classList.remove('focused-child')
                index -= 1;
                focusableChild[index].focus();
                focusableChild[index].classList.add('focused-child')
              }
            }
            else if (e.key === "ArrowDown") {
              if(index < (numberOfChildren - 1)) {
                focusableChild[index].classList.remove('focused-child')
                index += 1;
                focusableChild[index].focus();
                focusableChild[index].classList.add('focused-child')
              }
            }
            else if (e.key === "Tab") {
              let parent = child.parentElement
              let siblings = parent.querySelectorAll('.focusable-child')
              parent.classList.remove('focused-parent')
              child.setAttribute('tabindex', '-1')

              for(let i = 0; i < numberOfChildren; i++) {
                siblings[i].setAttribute('tabindex', '-1')
              }
              
            }
            else {
              return false
            } 
            /*
            if(e.key === "ArrowUp") {
              if(index > 0) {
                focusableChild[indice].classList.remove('focused-child')
                indice -= 1;
                child.focus();
                child.classList.add('focused-child')
              }
            } 
            
            else if (e.key === "ArrowDown") {
              if(indice < (numberOfChildren - 1)) {
                focusableChild[indice].classList.remove('focused-child')
                indice += 1;
                focusableChild[indice].focus();
                focusableChild[indice].classList.add('focused-child')
              }
            }
            
            else if (e.key === "Tab") {
              for(let i = 0; i < numberOfChildren; i++) {
                section.classList.remove('focused-parent')
                focusableChild[i].setAttribute('tabindex', '-1')
                //section.setAttribute('tabindex', '0')
              }
            }
            */
          })

        }

      }
    }) 

    // Atribui o evento "keydown"
    focusableSection[i].addEventListener('keydown', (e) => {

      const section = e.target;
      //const focusableChild = section.querySelector('.focusable-child')

      if(e.key === 'Tab') {
        //section.setAttribute('tabindex', '0')
        //section.classList.remove('focused-parent')
      }
    })
  }
}


