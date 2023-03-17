
function navigationOnText() {

  const classFocusableSection = 'focusable-section';
  const classFocusableChild = 'focusable-child';
  const classFocusedParent = 'focused-parent';

  const focusableSection = document.getElementsByClassName(classFocusableSection)

  const body = document.getElementsByTagName('body')

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

        setTabindexOnSection(focusableSection)

        // Parent's element tab is removed
        section.setAttribute('tabindex', '-1')

        // Active tab on children elements where focusableSection has focus
        for(let i = 0; i < focusableChild.length; i++) {

          focusableChild[i].setAttribute('tabindex', '0')
          if(i === 0) {
            //focusableChild[i].classList.add('focused-child')
            focusableChild[i].focus();
            section.classList.add('focused-parent')
          }

          // FOCUS EVENT seted in focusableChild
          focusableChild[i].addEventListener('focus', () => {
            section.classList.add('focused-parent')
          })

          // KEYDON EVENT seted in focusableChild
          focusableChild[i].addEventListener('keydown', keyboardNavigableChild)
        }
      }
    })
    focusableSection[i].addEventListener('keydown', (element) => {

    })
  }
  
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

  /*
  *
  * @param = NodeList 
  */
  const setTabindexOnChildren = (child) => {
    let siblings = child.parentElement.getElementsByClassName(classFocusableChild)
    for(let i = 0; i < siblings.length; i++) {
      siblings[i].setAttribute('tabindex', '0')
    }
  }

  const keyboardNavigableChild = (e) => {
    
    const child = e.target
    const nextSibling = child.nextElementSibling
    const previousSibling = child.previousElementSibling
    
    const prev = () => {
      if(child.classList.contains(classFocusableChild)) {
        if(previousSibling) {
          previousSibling.focus();
        }
      } else {
        child.parentElement.focus()
        setTabindexOnChildren(child.parentElement)
      }
    }

    const next = () => {
      if(child.classList.contains(classFocusableChild)) {
        if(nextSibling) {
          nextSibling.focus()
        }
      } else {
        setTabindexOnChildren(child.parentElement)
        child.parentElement.nextElementSibling.focus()
      }
    }

    const tab = () => {
      
      const parent = child.parentElement
      const siblings = parent.getElementsByClassName(classFocusableChild)
      const numberOfChildren = siblings.length

      parent.classList.remove('focused-parent')

      if(child.classList.contains(classFocusableChild)) {
        child.setAttribute('tabindex', '-1')
      }

      for(let i = 0; i < numberOfChildren; i++) {
        siblings[i].setAttribute('tabindex', '-1')
      }
      
    }

    switch(e.key) {
      case "ArrowUp":
        prev();
        break;
      case "ArrowDown":
        next();
        break;
      case "Tab":
        tab();
        break;
    }
  }
}


