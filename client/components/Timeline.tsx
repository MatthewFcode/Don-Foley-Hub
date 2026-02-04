import Nav from './Nav.tsx'
import Contact from './Contact.tsx'

function CareerTimeline() {
  const timelineData = [
    {
      company: 'Watercare',
      years: '2024-2025',
      position: 'top',
      logo: '/images/watercare.jpeg',
      title: 'HRIS Phase I + Phase II Programme Director',
    },
    {
      company: '3 Waters',
      years: '2023-2024',
      position: 'bottom',
      logo: '/images/3waters.jpeg',
      title: 'Delivery Lead',
    },
    {
      company: 'Contact Energy',
      years: '2021-2022',
      position: 'top',
      logo: '/images/contact.png',
      title: 'SAP S/4 HANA Transformation Programme Director',
    },
    {
      company: 'Auckland Council',
      years: '2019-2021',
      position: 'bottom',
      logo: '/images/auckland_council_logo.jpeg',
      title: 'Programme Manager SAP & S/4 HANA',
    },
    {
      company: 'SAP & Auckland Council',
      years: '2018-2019',
      position: 'top',
      logo: '/images/Sap.png',
      title: 'Projects Delivery Lead',
    },
    {
      company: 'Fonterra',
      years: '2017-2018',
      position: 'bottom',
      logo: '/images/Fonterra.png',
      title: 'Programme Lead (SAP ARIBA)',
    },
    {
      company: 'Air New Zealand',
      years: '2015-2017',
      position: 'top',
      logo: '/images/airnz.jpeg',
      title: 'Senior Project Manager',
    },
    {
      company: 'BNZ',
      years: '2015 (Jan-Jun)',
      position: 'bottom',
      logo: '/images/bnz.jpeg',
      title: 'Senior Project Manager',
    },
    {
      company: 'Air New Zealand',
      years: '2011-2014',
      position: 'top',
      logo: '/images/airnz.jpeg',
      title: 'Technology Project Manager',
    },
    {
      company: 'ASB',
      years: '2010-2011',
      position: 'bottom',
      logo: '/images/asb.png',
      title: 'Technology Project Manager',
    },
    {
      company: 'ANZ',
      years: '2010 (May-Jun)',
      position: 'top',
      logo: '/images/anz.webp',
      title: 'Technology Project Manager',
    },
    {
      company: 'BNZ',
      years: '2008-2010',
      position: 'bottom',
      logo: '/images/bnz.jpeg',
      title: 'Programme Lead Technology',
    },
    {
      company: 'GlaxoSmithKline (UK)',
      years: '2004-2008',
      position: 'top',
      logo: '/images/glaxo.jpeg',
      title: 'IT Services Director',
    },
    {
      company: 'Business Objects (SAP)',
      years: '1999-2004',
      position: 'bottom',
      logo: '/images/Sap.png',
      title: 'Customer Advocacy Manager',
    },
    {
      company: 'Maximo (IBM)',
      years: '1998-1999',
      position: 'top',
      logo: '/images/IBM.svg',
      title: 'Senior Technical Support Analyst',
    },
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
                  <div className="company-header">
                    <img
                      src={item.logo}
                      alt={`${item.company} logo`}
                      className="company-logo"
                    />
                    <h3>{item.company}</h3>
                  </div>
                  <p className="job-title">{item.title}</p>
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
