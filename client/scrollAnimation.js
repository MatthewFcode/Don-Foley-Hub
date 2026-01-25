// scrollAnimations.js
// Add this to a utils folder and import where needed

export const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
        // Optional: unobserve after animation to improve performance
        // observer.unobserve(entry.target);
      }
    })
  }, observerOptions)

  // Observe all elements with scroll animation classes
  const animateElements = document.querySelectorAll(
    '.scroll-fade, .scroll-fade-left, .scroll-fade-right, .scroll-scale',
  )

  animateElements.forEach((el) => {
    observer.observe(el)
  })

  // Return cleanup function
  return () => {
    animateElements.forEach((el) => {
      observer.unobserve(el)
    })
  }
}

// For React components, use this in a useEffect hook:
/*
useEffect(() => {
  const cleanup = initScrollAnimations();
  return cleanup;
}, []);
*/
