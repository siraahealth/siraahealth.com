export default function ThankYouPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Nunito:wght@700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', system-ui, sans-serif; color: #333333; background: #F5F0FC; }
        .ty-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #F0EBF8, #FCF0F0, #F5F0FC);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          padding: 3rem 2rem;
        }
        .ty-check {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: #2DBF6E;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.4rem;
          font-size: 2.6rem;
          color: #fff;
        }
        .ty-page h1 {
          font-family: 'Nunito', sans-serif;
          font-size: 2.2rem;
          font-weight: 900;
          color: #E8614A;
          margin-bottom: 10px;
        }
        .ty-sub {
          font-size: 1.1rem;
          color: #444;
          margin-bottom: 8px;
          line-height: 1.7;
          max-width: 460px;
        }
        .ty-detail {
          font-size: 13.5px;
          color: #888;
          max-width: 400px;
          line-height: 1.8;
        }
        .ty-brand {
          font-family: 'Nunito', sans-serif;
          font-weight: 900;
          font-size: 16px;
          color: #E8614A;
          margin-top: 2.5rem;
        }
      `}} />
      <div className="ty-page">
        <div className="ty-check">&#10003;</div>
        <h1>Thank You!</h1>
        <p className="ty-sub">We have received your query.</p>
        <p className="ty-detail">
          Our expert will call you shortly. If you need to reach us sooner, call{' '}
          <strong>+91 99107 31103</strong> directly.
        </p>
        <div className="ty-brand">Siraa Health</div>
      </div>
    </>
  );
}
