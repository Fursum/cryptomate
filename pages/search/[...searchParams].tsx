import { NextPage, GetServerSideProps } from "next";

interface Props {
  query:string | string[];
}

const Search: NextPage<Props> = ({query}) => {

  return <div>Search query: {query}</div>;

};

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  return {
    props: {
      query: ctx.params?.searchParams,
    },
  };
};


export default Search;