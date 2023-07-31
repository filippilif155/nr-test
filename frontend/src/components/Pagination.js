import { Button } from 'primereact/button';

const Pagination = ({ offset, limit, totalCount, onChange }) => {
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = offset / limit + 1;

    const handlePrev = () => {
        if (currentPage > 1) {
            onChange(offset - limit);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onChange(offset + limit);
        }
    };

    return (
        <div className="pagination-container">
            <Button
                label="Previous"
                onClick={handlePrev}
                disabled={currentPage === 1}
            />
            <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>
            <Button
                label="Next"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            />
        </div>
    );
};

export default Pagination;
