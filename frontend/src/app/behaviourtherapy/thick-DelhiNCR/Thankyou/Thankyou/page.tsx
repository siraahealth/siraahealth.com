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
          font-family: 'Nunito',
