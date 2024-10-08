import CreateUser from "../features/user/CreateUser";
function Home() {
  return (
    <div className="my-10 p-4 text-center sm:my-16">
      <h1 className="mb-8 text-3xl font-semibold md:text-3xl">
        The Best Pizza
        <br />
        <span className="text-yellow-600">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
