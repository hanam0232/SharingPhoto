const HomeGreeting = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="greeting-container">
      <h1>Chào mừng trở lại, {user?.fullName}!</h1>
      <p>Chọn một người bạn ở bên trái để xem thông tin của họ.</p>
    </div>
  );
};

export default HomeGreeting;
