import { NewsResponse } from "../types/Global"

const API_KEY = '7f52376fd98543d685671f459d6ff299'

export const getData = async () => {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
    if (!res.ok) {
        throw new Error('Failed to fetch data from NewsAPI');
    }
    const data: NewsResponse = await res.json();
    return data.articles;
}

