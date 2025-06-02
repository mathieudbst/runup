document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('course-search');
    const distanceFilter = document.getElementById('distance-filter');
    const typeFilter = document.getElementById('type-filter');
    const locationFilter = document.getElementById('location-filter');
    const courseItems = document.querySelectorAll('.course-item');

    const filterCourses = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedDistance = distanceFilter.value;
        const selectedType = typeFilter.value;
        const selectedLocation = locationFilter.value;

        courseItems.forEach(item => {
            const courseName = item.querySelector('h3').textContent.toLowerCase();
            const courseLocationText = item.querySelector('p:nth-of-type(2)').textContent.toLowerCase();
            const courseDistanceText = item.querySelector('p:nth-of-type(3)').textContent.toLowerCase();
            const courseTypeText = item.querySelector('p:nth-of-type(4)').textContent.toLowerCase();
            const courseDateText = item.querySelector('p:nth-of-type(1)').textContent.toLowerCase(); 

            const matchesSearch = courseName.includes(searchTerm) || courseLocationText.includes(searchTerm) || courseDateText.includes(searchTerm);

            const matchesDistance = selectedDistance === 'all' || 
                                    (selectedDistance === '10km' && (courseDistanceText.includes('10 km') || courseDistanceText.includes('10km'))) ||
                                    (selectedDistance === '21km' && (courseDistanceText.includes('21.1 km') || courseDistanceText.includes('semi-marathon'))) ||
                                    (selectedDistance === '42km' && (courseDistanceText.includes('42.195 km') || courseDistanceText.includes('marathon'))) ||
                                    (selectedDistance === 'other' && !(courseDistanceText.includes('10 km') || courseDistanceText.includes('10km') || courseDistanceText.includes('21.1 km') || courseDistanceText.includes('semi-marathon') || courseDistanceText.includes('42.195 km') || courseDistanceText.includes('marathon')));

            const matchesType = selectedType === 'all' || courseTypeText.includes(selectedType.toLowerCase());

            const matchesLocation = selectedLocation === 'all' || courseLocationText.includes(selectedLocation.toLowerCase());

    
            if (matchesSearch && matchesDistance && matchesType && matchesLocation /* && matchesDate */) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    };

    // Écoute les événements sur tous les contrôles de filtre
    searchInput.addEventListener('input', filterCourses);
    distanceFilter.addEventListener('change', filterCourses);
    typeFilter.addEventListener('change', filterCourses);
    locationFilter.addEventListener('change', filterCourses);

    filterCourses();
}); 