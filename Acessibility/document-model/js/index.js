
function navigationOnText() {

  const classFocusableSection = 'focusable-section';
  const classFocusableChild = 'focusable-child';
  const classFocusedParent = 'focused-parent';

  const focusableSection = document.getElementsByClassName(classFocusableSection)

  const body = document.getElementsByTagName('body')

  /*
  * 
  * @param = NodeList 
  */
  function removeClassFocusedParent(focusableSection) {
    for(let i = 0; i < focusableSection.length; i++) {
      focusableSection[i].classList.remove(classFocusedParent)
    }
  }

  /*
  *
  * @param = NodeList 
  */
  function setTabindexOnSection(focusableSection) {
    for(let i = 0; i < focusableSection.length; i++) {
      focusableSection[i].setAttribute('tabindex', '0')
    }
  }

  body[0].addEventListener('keydown', (e) => {
    if(e.key === 'Tab') {
      let activeElement = document.activeElement;
      if((activeElement.classList.contains(classFocusableSection)) ||
      (activeElement.classList.contains(classFocusableChild))) {
        return false
      } else {
        setTabindexOnSection(focusableSection)
      }
    }
  })

  body[0].addEventListener('click', (e) => {

    removeClassFocusedParent(focusableSection)

    let activeElement = document.activeElement;
    
    if((activeElement.classList.contains(classFocusableSection)) ||
    activeElement.classList.contains(classFocusableChild)) {

      let parent = activeElement.parentElement.classList

      if((parent.contains(classFocusableSection))) {
        parent.add(classFocusedParent)
      }
      else {
        return false;
      }
    }
  })

  // Sets events in focusableSection and focusableChild
  for(let i = 0; i < focusableSection.length; i++) {

    // EVENT FOCUS seted in focusableSection
    focusableSection[i].addEventListener('focus', (e) => {
      
      let section = e.target;
      
      // Finds all of children that are focusable
      let focusableChild = e.target.getElementsByClassName(classFocusableChild);
      
      if(focusableChild.length != 0) {

        let index = 0;
        const numberOfChildren = focusableChild.length;

        setTabindexOnSection(focusableSection)

        // Parent's element tab is removed
        section.setAttribute('tabindex', '-1')

        // Active tab on children elements where focusableSection has focus
        for(let i = 0; i < focusableChild.length; i++) {

          focusableChild[i].setAttribute('tabindex', '0')
          

          if(i === 0) {
            focusableChild[i].classList.add('focused-child')
            focusableChild[i].focus();
            section.classList.add('focused-parent')
          }

          // FOCUS EVENT seted in focusableChild
          focusableChild[i].addEventListener('focus', () => {
            section.classList.add('focused-parent')
          })

          // KEYDON EVENT seted in focusableChild
          focusableChild[i].addEventListener('keydown', (e) => {

            let child = focusableChild[i]

            if(e.key === "ArrowUp") {
              if(!(e.target.classList.contains(classFocusableChild))) {
                if(child.classList.contains(classFocusableChild)) {
                  let siblings = child.parentElement.getElementsByClassName(classFocusableChild);
                  for(let i = 0; i < siblings.length; i++) {
                    siblings[i].setAttribute('tabindex', '0')
                  }
                  if(index > 0) {
                    focusableChild[index].classList.remove('focused-child')
                    --index
                    focusableChild[index].focus();
                    focusableChild[index].classList.add('focused-child')
                  } else {
                    focusableChild[index].focus();
                    focusableChild[index].classList.add('focused-child')
                  }
                } 
              } else {
                if(index > 0) {
                  focusableChild[index].classList.remove('focused-child')
                  index--
                  focusableChild[index].focus();
                  focusableChild[index].classList.add('focused-child')
                }
              }
            }
            else if (e.key === "ArrowDown") {
              if(!(e.target.classList.contains(classFocusableChild))) {
                if(child.classList.contains(classFocusableChild)) {
                  let siblings = child.parentElement.getElementsByClassName(classFocusableChild);
                  for(let i = 0; i < siblings.length; i++) {
                    siblings[i].setAttribute('tabindex', '0')
                  }
                  if(index < (numberOfChildren - 1)) {
                    focusableChild[index].classList.remove('focused-child')
                    index++
                    focusableChild[index].focus();
                    focusableChild[index].classList.add('focused-child')
                  } else {
                    focusableChild[index].focus();
                    focusableChild[index].classList.add('focused-child')
                  }
                } 
              } else {
                if(index < (numberOfChildren - 1)) {
                  focusableChild[index].classList.remove('focused-child')
                  index++
                  focusableChild[index].focus();
                  focusableChild[index].classList.add('focused-child')
                }
              }
              /*
              if(index < (numberOfChildren - 1)) {
                focusableChild[index].classList.remove('focused-child')
                index++
                focusableChild[index].focus();
                focusableChild[index].classList.add('focused-child')
              }
              */
            }
            else if (e.key === "Tab") {
              let parent = child.parentElement
              let siblings = parent.getElementsByClassName(classFocusableChild)
              parent.classList.remove('focused-parent')
              child.setAttribute('tabindex', '-1')

              for(let i = 0; i < numberOfChildren; i++) {
                siblings[i].setAttribute('tabindex', '-1')
              }
              
            }
            else {
              return false
            } 
          })
        }
      }
    })
  } 
}


