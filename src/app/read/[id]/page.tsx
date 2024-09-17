
interface Data {
  id: number;
  title: string;
  body: string;
}

async function getTopic(id: string) {
  const res = await fetch(`${process.env.BASE_URL}?id=${id}`, { cache: 'no-store' });
  return res.json();
}

export default async function Read({ params: { id } }: { params: { id: string } }) {
  const res: Data[] = await getTopic(id);
  const [data] = res;
  return (
    <>
      <h2>{data.title}</h2>
      {data.body}
    </>
  );
}