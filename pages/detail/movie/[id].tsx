import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ApiService } from "src/api/apiService";

const Movie: React.FC = () => {
    const router = useRouter();
    const { data, isLoading } = useQuery(["movie"], () =>
        ApiService.get(`/movie/${router.query.id}`).then((res) => res.data),
    );
    // TODO  DATA IS NOT REFRESHING AS EXPECTED
    return (
        <>
            holi movie id: {router.query.id} name:{data?.title}
            {console.table(data)}
        </>
    );
};

export default Movie;
