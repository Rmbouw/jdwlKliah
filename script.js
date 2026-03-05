(function() {
        const dateSpan = document.getElementById('displayDate');
        const dateBtn = document.getElementById('dateButton');

        const hariList = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const bulanList = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

        function formatTanggal(now) {
            const hari = hariList[now.getDay()];
            const tgl = now.getDate().toString().padStart(2, '0');
            const bulan = bulanList[now.getMonth()];
            const tahun = now.getFullYear();
            return `${hari}, ${tgl} ${bulan} ${tahun}`;
        }

        const today = new Date();
        dateSpan.textContent = formatTanggal(today);

        let fp = dateBtn._flatpickr;
        if (!fp) {
            fp = flatpickr(dateBtn, {
                inline: false,        
                position: 'below',   
                enableTime: false,   
                dateFormat: "j F Y",  
                defaultDate: today,
                static: true,
                disableMobile: "true", 
                locale: {
                    firstDayOfWeek: 1,
                    weekdays: {
                        shorthand: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
                        longhand: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
                    },
                    months: {
                        shorthand: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
                        longhand: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
                    }
                },
                onChange: function(selectedDates, dateStr, instance) {
                    if (selectedDates.length > 0) {
                        const selected = selectedDates[0];
                        dateSpan.textContent = formatTanggal(selected);
                    }
                },
                onClose: function() {
                }
            });
            
            dateBtn._flatpickr = fp;
        }

        dateBtn.removeEventListener('click', dateBtn.clickHandler);
            dateBtn.clickHandler = function() {
            fp.open(); 
        };
        dateBtn.addEventListener('click', dateBtn.clickHandler);

        setInterval(() => {
            const sekarang = new Date();
            dateSpan.textContent = formatTanggal(sekarang);
            fp.setDate(sekarang, false); 
        }, 60000);
    })();