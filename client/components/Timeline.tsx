import Nav from './Nav.tsx'
import Contact from './Contact.tsx'

function CareerTimeline() {
  const timelineData = [
    { company: 'Watercare', years: '2024-2025', position: 'top' },
    { company: '3 Waters', years: '2023-2024', position: 'bottom' },
    { company: 'Contact Energy', years: '2021-2022', position: 'top' },
    { company: 'Auckland Council', years: '2019-2021', position: 'bottom' },
    { company: 'SAP & Auckland Council', years: '2018-2019', position: 'top' },
    { company: 'Fonterra', years: '2017-2018', position: 'bottom' },
    { company: 'Air New Zealand', years: '2015-2017', position: 'top' },
    { company: 'BNZ', years: '2015 (Jan-Jun)', position: 'bottom' },
    { company: 'Air New Zealand', years: '2011-2014', position: 'top' },
    { company: 'ASB', years: '2010-2011', position: 'bottom' },
    { company: 'ANZ', years: '2010 (May-Jun)', position: 'top' },
    { company: 'BNZ', years: '2008-2010', position: 'bottom' },
    { company: 'GlaxoSmithKline (UK)', years: '2004-2008', position: 'top' },
    {
      company: 'Business Objects (SAP)',
      years: '1999-2004',
      position: 'bottom',
    },
    { company: 'Maximo (IBM)', years: '1998-1999', position: 'top' },
  ]

  return (
    <>
      <Nav />
      <div className="career-timeline-container" id="timeline">
        <div className="timeline-header">
          <h1>Career Timeline</h1>
          <img src="/images/workday.jpeg" alt="Don" />
          <div className="timeline-scroll-indicator"></div>
        </div>
        <div className="arrows-horizontal">
          <div className="arrow-horizontal"></div>
          <div className="arrow-horizontal"></div>
          <div className="arrow-horizontal"></div>
        </div>
        <p className="right-sunshine-scroll">
          <em>scroll right..</em>
        </p>

        <div className="timeline-wrapper">
          <div className="timeline">
            <div className="timeline-line"></div>

            {timelineData.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-dot"></div>

                <div
                  className={`timeline-connector connector-${item.position}`}
                ></div>

                <div className={`timeline-content content-${item.position}`}>
                  <h3>{item.company}</h3>
                  <p className="timeline-dates">{item.years}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Contact />
      </div>
    </>
  )
}

export default CareerTimeline
