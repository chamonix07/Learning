// Objectives
// Mampu memecahkan masalah yang diberikan.
// Mampu menggabungkan konsep looping / iteration dan conditional.
// Mampu membuat array dari string tertentu dan memanipulasi array.
// Mengerti keterhubungan satu function dengan function lainnya.
// Mengerti cara melemparkan data yang dikembalikan dari satu function kemudian digunakan sebagai parameter function lain.

// Hints
// Nama function haruslah splitJobCharacters, reverseJobCharacters, decryptJobCharacters, makingDreamTeam, dan startUpMatchMaking 
// dan tidak boleh diganti dengan nama function lainnya. 
// Untuk detail fungsi akan mengacu kepada Directions yang disebutkan di bawah.

// cara kerja untuk function startUpMatchMaking:
// Pisahkan nama dan job characters menjadi array. Gunakan function splitJobCharacters.
// Putar balikkan value job characters yg telah disandikan. Gunakan function reverseJobCharacters.
// Decryptlah value job characters yg telah disandikan. Gunakan function decryptJobCharacters.
// Bentuklah sebuah tim dengan format array 2 dimensi yang tiap elementnya berisi nama dan job characters. Gunakan function makingDreamTeam.

// Berikut adalah kriteria function startUpMatchMaking:
// Harus memanfaatkan function splitJobCharacters, reverseJobCharacters, decryptJobCharacters, dan makingDreamTeam dan dipanggil di dalam function startUpMatchMaking secara berurutan.
// Function akan mengembalikan string berdasarkan hasil pengecekkan data start-up tim di function startUpMatchMaking.
// Function akan mengembalikan string Minimum 3 members in the team jika data start-upnya yang sudah diolah kurang dari 3 orang.

//====================================================================================================================
// splitJobCharacters 
// menerima satu parameter string. 
// Dimana function ini akan memisahakan/splitting input str menjadi array dengan urutan nama dan job characters. 
// Output dari function ini bertipe data array.

// console.log(splitJobCharacters("idaz-sfmutvi,anggara-sfutqji,dear-sfldbi"));
// [ 'idaz', 'sfmutvi', 'anggara', 'sfutqji', 'dear', 'sfldbi' ]
// console.log(splitJobCharacters("kurnia-sfutqji,adi-sfldbi,anggara-sfmutvi"));
// [ 'kurnia', 'sfutqji', 'adi', 'sfldbi', 'anggara', 'sfmutvi' ]

//=====================================================================================================================
// reverseJobCharacters 
// menerima satu parameter array. 
// Dimana function ini akan membalik value job characters bertipe data string di dalam data array . 
// Output dari function ini bertipe data array dan value job characters bertipe data string hasil reversing

// console.log(
//   reverseJobCharacters([
//     "idaz",
//     "sfmutvi",
//     "anggara",
//     "sfutqji",
//     "dear",
//     "sfldbi",
//   ])
// );
// // [ 'idaz', 'ivtumfs', 'anggara', 'ijqtufs', 'dear', 'ibdlfs' ]
// console.log(
//   reverseJobCharacters([
//     "kurnia",
//     "sfutqji",
//     "adi",
//     "sfldbi",
//     "anggara",
//     "sfmutvi",
//   ])
// );
// // [ 'kurnia', 'ijqtufs', 'adi', 'ibdlfs', 'anggara', 'ivtumfs' ]

//=================================================================================================================

// decryptJobCharacters
// Dimana function ini akan mendekripsikan/decode value job characters bertipe data string di dalam data array, 
// dan cara kerjanya dari function ini ada menggeser setiap huruf menjadi huruf sebelumnya (ex:I menjadi H). 
// Output dari function ini bertipe data array dan value job characters bertipe data string hasil decryption

// console.log(
//   decryptJobCharacters([
//     "idaz",
//     "ivtumfs",
//     "anggara",
//     "ijqtufs",
//     "dear",
//     "ibdlfs",
//   ])
// );
// // [ 'idaz', 'hustler', 'anggara', 'hipster', 'dear', 'hacker' ]
// console.log(
//   decryptJobCharacters([
//     "kurnia",
//     "ijqtufs",
//     "adi",
//     "ibdlfs",
//     "anggara",
//     "ivtumfs",
//   ])
// );
// // [ 'kurnia', 'hipster', 'adi', 'hacker', 'anggara', 'hustler' ]

//=================================================================================================================

// makingDreamTeam 
// menerima satu parameter bertipe data array. 
// Dimana function ini akan mengelompokan data sebuah tim start-up dengan format array 2 dimensi yang tiap elementnya berisi nama dan job characters. 
// Output dari function ini bertipe data array 2 dimensi

// console.log(
//   makingDreamTeam(["idaz", "hustler", "anggara", "hipster", "dear", "hacker"])
// );
// // [
// //   [ 'idaz', 'hustler' ],
// //   [ 'anggara', 'hipster' ],
// //   [ 'dear', 'hacker' ]
// // ]
// console.log(
//   makingDreamTeam(["kurnia", "hipster", "adi", "hacker", "anggara", "hustler"])
// );
// // [
// //   [ 'kurnia', 'hipster' ],
// //   [ 'adi', 'hacker' ],
// //   [ 'anggara', 'hustler' ]
// // ]

//=================================================================================================================

//startUpMatchingTeam
// menggabungkan seluruh function yang sudah kita buat sebelumnya dengan aturan:
// Jika team startup memiliki character kurang dari 3 maka tampilkan Minimum 3 members in the team
// Jika di dalam team startup memiliki character dengan job hustler, hipster dan hacker maka tampilkan Match your dream Start-up team.
// Jika tidak maka tampilkan The job composition in the team is not suitable.

// console.log(startUpMatchMaking("idaz-sfmutvi,anggara-sfutqji,fika-sfldbi"));
// // Match your Dream Start-Up Team
// console.log(
//   startUpMatchMaking(
//     "eko-sfldbi,fajrin-sfmutvi,abdullah-sfutqji,anggara-sfutqji"
//   )
// );
// // Match your Dream Start-Up Team
// console.log(
//   startUpMatchMaking(
//     "abdullah-sfldbi,fajrin-sfmutvi,samir-sfldbi,eko-sfmutvi,basil-sfmutvi"
//   )
// );
// // The job composition in the team is not suitable
// console.log(startUpMatchMaking("samir-sfmutvi,basil-sfutqji,eko-sfmutvi"));
// // The job composition in the team is not suitable
// console.log(startUpMatchMaking("samir-sfmutvi,basil-sfutqji"));
// // Minimum 3 members in the team


function splitJobCharacters(str) {
    let arrayTeams = [];
    let currentWord = "";

    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        console.log('1.char:', char);

        if (char === "," || char === "-") {
            arrayTeams.push(currentWord);
            console.log('2.currentword:', currentWord);
            currentWord = "";
        }
        else {
            currentWord = currentWord + char;
        }
    }

    arrayTeams.push(currentWord);

    console.log('3.arrayTeams split:', arrayTeams);
    return arrayTeams;
}


  function reverseJobCharacters(arr) {
    let arrayTeams = [];

    for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 1) {
            let reversed = "";
            for (let j = arr[i].length - 1; j >= 0; j--) {
                reversed = reversed + arr[i][j];
                console.log('1.reverse:', reversed);
            }
            arrayTeams.push(reversed);
            console.log('2.arrayTeams job:', arrayTeams);
        } else {
            arrayTeams.push(arr[i]);
        }
    }
    console.log('3.arrayTeams reversed name:', arrayTeams);
    return arrayTeams;
}


function decryptJobCharacters(arr) {
    let arrayTeams = [];
    let alphabet = "abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 1) {
            let decrypted = "";
            for (let j = 0; j < arr[i].length; j++) {
                let char = arr[i][j];
                let lowerChar = char.toLowerCase();
                let index = -1;
                
                for (let k = 0; k < alphabet.length; k++) {
                    if (alphabet[k] === lowerChar) {
                        index = k;
                        break;
                    }
                }
                console.log('1.index:', index);
                
                if (index !== -1) {
                    let newIndex = (index - 1 + 26) % 26;
                    decrypted = decrypted + alphabet[newIndex];
                    console.log('1.newIndex:', newIndex);
                } else {
                    decrypted = decrypted + lowerChar;
                }
            }
            console.log('2.decrypted:', decrypted);
            arrayTeams.push(decrypted);
        } else {
            arrayTeams.push(arr[i]);
        }
    }
    console.log('3.arrayTeams decrypted name:', arrayTeams);
    return arrayTeams;
}


function makingDreamTeam(arr) {
    let dreamTeams = [];

    for (let i = 0; i < arr.length; i += 2) {
        dreamTeams.push([arr[i], arr[i + 1]]);
    }

    console.log('2.dreamTeams:', dreamTeams);
    return dreamTeams;
}


function startUpMatchMaking(str) {
    let checkTeam = splitJobCharacters(str);
    let countName = 0;

    for (let i = 0; i < checkTeam.length; i += 2) {
        countName++;
    }

    if (countName < 3) {
        return "Minimum 3 members in the team";
    }

    let reversedTeam = reverseJobCharacters(checkTeam);
    let decryptedTeam = decryptJobCharacters(reversedTeam);
    let dreamTeam = makingDreamTeam(decryptedTeam);

    let jobs = [];
    for (let member of dreamTeam) {
        jobs.push(member[1]);
    }

    let requiredJobs = ["hustler", "hipster", "hacker"];
    let isDreamTeam = true;

    for (let job of requiredJobs) {
        let found = false;
        for (let j = 0; j < jobs.length; j++) {
            if (jobs[j] === job) {
                found = true;
                break;
            }
        }
        if (!found) {
            isDreamTeam = false;
            break;
        }
    }

    if (isDreamTeam) {
        return "Match your Dream Start-Up Team";
    } else {
        return "The job composition in the team is not suitable";
    }
}


var dreamTeams = "idaz-sfmutvi,anggara-sfutqji,dear-sfldbi";
var startup = startUpMatchMaking(dreamTeams);
console.log("HASIL AKHIR:", startup);