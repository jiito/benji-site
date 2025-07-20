export default function NotFound() {
  return (
      <>
      <div className="flex flex-col items-center justify-center">
        <h1 className=" text-2xl font-bold">You found a new page! Congrats!</h1>
        <p className="text-lg">If you think it should exist, let me know (or make it yourself)</p>
      </div>

      {/* <p className="text-lg">You're not the only one lost. You and {Math.floor(Math.random() * 100)} other people are lost. </p> */}
      </>
  );
}