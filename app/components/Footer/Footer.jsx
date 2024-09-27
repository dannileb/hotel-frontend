export const Footer = () => {
  return (
    <footer className="bg-blue-500">
      <div className="container mx-auto my-0 p-2 flex flex-col items-center justify-center gap-2 text-sky-50">
        <p className="text-2xl font-bold">Отель Чиллиад</p>
        <p>{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};
