    var vacancies = [
        {value:"1", label:"Database Developer"},
        {value:"2", label:"Web Developer"},
        {value:"3", label:"Mobile Developer"}
    ];

    var positions = [
        {value:"1", label:"Jakarta"},
        {value:"2", label:"Bandung"},
        {value:"3", label:"Bekasi"}
    ];

    var vacancySelect = document.getElementById("vacancy");
        vacancies.forEach(function (vacancy) {
            var option = document.createElement("option");
            option.value = vacancy.value;
            option.text = vacancy.label;
            vacancySelect.appendChild(option);
        });

        var positionSelect = document.getElementById("position");
        positions.forEach(function (position) {
            var option = document.createElement("option");
            option.value = position.label;
            option.text = position.label;
            positionSelect.appendChild(option);
        });

        var applicants      = [];
        var submittedEmails = [];

        document.getElementById("recruitment").addEventListener("submit", function (event) {
            event.preventDefault();

            var fullname        = document.getElementById("fullname").value;
            var email           = document.getElementById("email").value;
            var phone           = document.getElementById("phone").value;
            var vacancy         = document.getElementById("vacancy").value;
            var position        = document.getElementById("position").value;

            var fullnameError   = document.getElementById("fullnameError");
            var emailError      = document.getElementById("emailError");
            var phoneError      = document.getElementById("phoneError");
            var vacancyError    = document.getElementById("vacancyError");
            var positionError   = document.getElementById("positionError");

            fullnameError.textContent   = "";
            emailError.textContent      = "";
            phoneError.textContent      = "";
            vacancyError.textContent    = "";
            positionError.textContent   = "";

            if (!fullname) { fullnameError.textContent = "Nama lengkap belum diisi!"; }
            if (!email) { emailError.textContent = "Email belum diisi!"; }
            if (!phone) { phoneError.textContent = "Nomor telepon belum diisi!"; }
            if (!vacancy) { vacancyError.textContent = "Lowongan belum diisi!"; }
            if (!position) { positionError.textContent = "Posisi belum diisi!"; }

            if (fullnameError.textContent || emailError.textContent || phoneError.textContent ||
                vacancyError.textContent || positionError.textContent) {
                return;
            }

            var selectedVacancy = vacancies.find(function (v) {
                return v.value === vacancy;
            });

            if (!selectedVacancy) {
                vacancyError.textContent = "Lowongan tidak valid.";
                return;
            }

            selectedVacancy.quota--;

            applicants.push({ fullname: fullname, email: email, phone: phone, vacancy: vacancy, position: position });
            submittedEmails.push(email);

            var totalApplicants = applicants.length;

            var result = "<span style='color: green;'>Terima kasih telah melakukan pendaftaran. Anda adalah pendaftar ke-" + totalApplicants + ". Permintaan Anda akan segera kami proses.</span><br><br>" +
                "Nama Lengkap: " + "<br>" + fullname + "<br>" + "<br>" +
                "Email: " + "<br>" + email + "<br>" + "<br>" +
                "Nomor Telepon: " + "<br>" + phone + "<br>" + "<br>" +
                "Lowongan: " + "<br>" + selectedVacancy.label + "<br>" + "<br>" +
                "Posisi: " + "<br>" + position;

            document.getElementById("result").innerHTML = result;

            document.getElementById("fullname").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("vacancy").selectedIndex = 0;
            document.getElementById("position").selectedIndex = 0;
    });