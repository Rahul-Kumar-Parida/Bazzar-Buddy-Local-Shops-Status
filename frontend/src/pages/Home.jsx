import React, { useEffect, useState } from 'react';
import { getShops } from '../api/shop';
import ShopCard from '../components/ShopCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';

export default function Home() {
    const [shops, setShops] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (!search.trim()) {
            // No search: get all shops
            getShops({})
                .then(setShops)
                .finally(() => setLoading(false));
        } else {
            // Search by name and location, merge and deduplicate
            Promise.all([
                getShops({ name: search }),
                getShops({ location: search })
            ]).then(([byName, byLocation]) => {
                // Merge and deduplicate by shop id
                const merged = [...byName, ...byLocation].filter(
                    (shop, idx, arr) => arr.findIndex(s => s.id === shop.id) === idx
                );
                setShops(merged);
            }).finally(() => setLoading(false));
        }
    }, [search]);

    return (
        <div>
            <h1 className="mb-4">Local Shops</h1>
            <SearchBar value={search} onChange={setSearch} placeholder="Search by name or location..." />
            {loading ? <LoadingSpinner /> : (
                <div>
                    {shops.length === 0 ? (
                        <div className="text-center text-sm" style={{ color: '#888' }}>No shops found.</div>
                    ) : (
                        shops.map(shop => <ShopCard key={shop.id} shop={shop} />)
                    )}
                </div>
            )}
        </div>
    );
}