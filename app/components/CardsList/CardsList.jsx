export const CardsList = ({ data, renderItemCallback }) => {
  return (
    <div className="flex justify-center flex-wrap gap-4">
      {data ? data.map(renderItemCallback) : <p>Кажется, тут пусто:(</p>}
    </div>
  );
};
