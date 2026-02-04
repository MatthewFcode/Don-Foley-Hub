function References() {
  interface Reference {
    name: string
    position: string
    reference: string
    photo: string
  }

  const references: Reference[] = [
    {
      name: 'Michael Harris',
      position: 'Programme Sponsor',
      reference:
        'Don consistently delivered complex programmes under pressure. His ability to align senior stakeholders and drive outcomes made a measurable difference to the organisation.',
      photo: '/images/don-golf.JPG',
    },
    {
      name: 'Sarah Thompson',
      position: 'Chief Digital Officer',
      reference:
        'Don brought clarity and momentum to a challenging transformation. He combines strategic thinking with hands-on delivery and earns trust quickly.',
      photo: '/images/don-golf.JPG',
    },
    {
      name: 'James Patel',
      position: 'Head of Technology',
      reference:
        'Working with Don was a masterclass in programme leadership. He navigated ambiguity, managed risk effectively, and always kept the team focused on value.',
      photo: '/images/don-golf.JPG',
    },
    {
      name: 'Emma Richardson',
      position: 'Senior Business Stakeholder',
      reference:
        'Don has a rare ability to translate complex technical work into outcomes the business truly understands. A calm, decisive, and highly capable leader.',
      photo: '/images/don-golf.JPG',
    },
  ]

  return (
    <>
      {references.map((item: Reference, index: number) => (
        <div key={index}>
          <h3>
            <span>{item.name}</span>
            <img src={item.photo} alt="reference profile" />
          </h3>
          <p>{item.position}</p>
          <p>{item.reference}</p>
        </div>
      ))}
    </>
  )
}

export default References
