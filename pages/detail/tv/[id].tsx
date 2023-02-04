import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ApiService } from "src/api/apiService";
const Tv: React.FC = () => {
    const router = useRouter();
    const { data, isLoading } = useQuery(["tv"], () =>
        ApiService.get(`/tv/${router.query.id}`).then((res) => res.data),
    );
    return (
        <>
            holi tv id: {router.query.id} name: {data?.name}
        </>
    );
};

export default Tv;
