#!/usr/bin/bash

# Scripting bash sederhana untuk mencatat pengeluaran harian
# Feature: Add, Edit, Delete, List, Summary
# Penyimpanan data temporary di dalam array
# Format data: date|category|amount|description 
# Owner : Ilkham 
# Version: 1.0
# Date : 2025-12-08
# ---------------------------

#Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
RED='\033[0;31m'
BOLD='\033[1m'
RESET='\033[0m'

#Deklarasi array untuk menyimpan data pengeluaran
declare -a expenseList

#Add expense function
add_expense() {
echo -e "${CYAN}-- Tambah Pengeluaran Baru --${RESET}"
    read -rp "Tanggal (DD-MM-YYYY) [kosong => hari ini]: " date
    if [[ -z "$date" ]]; then
        date=$(date '+%d-%m-%Y')
    else
        if ! [[ "$date" =~ ^[0-9]{2}-[0-9]{2}-[0-9]{4}$ ]]; then
            echo -e "${RED}Format tanggal tidak valid. Gunakan DD-MM-YYYY.${RESET}"
            return
        fi

        # Validate date is not bigger than today
        today=$(date '+%d-%m-%Y')
        if [[ $date > $today ]]; then
            echo -e "${RED}Tanggal tidak boleh melebihi hari ini.${RESET}"
            return
        fi
    fi

    # Input Category
    read -rp "Kategori: " category
    if [[ -z "$category" ]]; then
      echo -e "${RED}Kategori tidak boleh kosong.${RESET}"
      return
    fi

    # Input Amount
    read -rp "Jumlah (dalam angka): " amount
    if ! [[ "$amount" =~ ^[0-9]+([.,][0-9]{1,2})?$ ]]; then
      echo -e "${RED}Jumlah harus berupa angka (contoh: 13.89, 24000,98, 89000).${RESET}"
      return
    fi

    # Input Description
    read -rp "Deskripsi: " description
    if [[ -z "$description" ]]; then
      echo -e "${RED}Deskripsi tidak boleh kosong.${RESET}"
      return
    fi

    # Confirmation
    read -rp "Konfirmasi tambah pengeluaran? (y/n): " confirm
    if [[ "$confirm" =~ ^[Yy]$ ]]; then
        expenseList+=("${date}|${category}|${amount}|${description}")
        echo -e "${GREEN}Pengeluaran berhasil ditambahkan!${RESET}"
    fi
}

#Edit expense function
edit_expense() {
    echo -e "${CYAN}-- Edit Pengeluaran --${RESET}"
    list_expenses
    read -rp "Masukkan nomor pengeluaran yang akan diedit (1-${#expenseList[@]}): " edit_id
    
    if ! [[ "$edit_id" =~ ^[0-9]+$ ]] || [[ $edit_id -lt 1 ]] || [[ $edit_id -gt ${#expenseList[@]} ]]; then
        echo -e "${RED}Nomor pengeluaran tidak valid.${RESET}"
        return
    fi
    
    index=$((edit_id - 1))
    IFS='|' read -r date category amount description <<< "${expenseList[$index]}"
    
    echo -e "\n${YELLOW}Pengeluaran yang dipilih:${RESET}"
    echo -e "ID: ${YELLOW}$edit_id${RESET}, Tanggal: ${BLUE}$date${RESET}, Kategori: ${BLUE}$category${RESET}, Jumlah: ${BLUE}$amount${RESET}, Deskripsi: ${BLUE}$description${RESET}\n"
    
    read -rp "Tanggal baru [$date]: " new_date
    new_date="${new_date:-$date}"
    read -rp "Kategori baru [$category]: " new_category
    new_category="${new_category:-$category}"
    read -rp "Jumlah baru [$amount]: " new_amount
    new_amount="${new_amount:-$amount}"
    read -rp "Deskripsi baru [$description]: " new_description
    new_description="${new_description:-$description}"
    
    read -rp "Konfirmasi perubahan? (y/n): " confirm
    if [[ "$confirm" =~ ^[Yy]$ ]]; then
        expenseList[$index]="${new_date}|${new_category}|${new_amount}|${new_description}"
        echo -e "${GREEN}Pengeluaran berhasil diubah!${RESET}"
    fi
}

#Delete expense function
delete_expense() {
  echo -e "${CYAN}-- Hapus Pengeluaran --${RESET}"
    list_expenses
    read -rp "Masukkan nomor pengeluaran yang akan dihapus (1-${#expenseList[@]}): " delete_id
    
    if ! [[ "$delete_id" =~ ^[0-9]+$ ]] || [[ $delete_id -lt 1 ]] || [[ $delete_id -gt ${#expenseList[@]} ]]; then
        echo -e "${RED}Nomor pengeluaran tidak valid.${RESET}"
        return
    fi
    
    index=$((delete_id - 1))
    IFS='|' read -r date category amount description <<< "${expenseList[$index]}"
    
    echo -e "\n${YELLOW}Pengeluaran yang dipilih untuk dihapus:${RESET}"
    echo -e "ID: ${YELLOW}$delete_id${RESET}, Tanggal: ${BLUE}$date${RESET}, Kategori: ${BLUE}$category${RESET}, Jumlah: ${BLUE}$amount${RESET}, Deskripsi: ${BLUE}$description${RESET}\n"
    
    read -rp "Konfirmasi hapus pengeluaran? (y/n): " confirm
    if [[ "$confirm" =~ ^[Yy]$ ]]; then
        unset 'expenseList[index]'
        expenseList=("${expenseList[@]}")  # Re-index array
        echo -e "${GREEN}Pengeluaran berhasil dihapus!${RESET}"
    fi
}

#List expenses function
list_expenses() {
    echo -e "${CYAN}-- Daftar Pengeluaran --${RESET}"
    read -rp "Masukkan bulan dan tahun (MM-YYYY) untuk filter [kosong => semua]: " filter
    if [[ -z "${expenseList[*]}" ]]; then
        echo -e "${YELLOW}Belum ada pengeluaran.${RESET}"
        return
    fi

    local id=1
    for expense in "${expenseList[@]}"; do
        IFS='|' read -r date category amount description <<< "$expense"
        if [[ -n "$filter" ]]; then
            expense_month_year=$(echo "$date" | awk -F'-' '{print $2"-"$3}')
            if [[ "$expense_month_year" != "$filter" ]]; then
                ((id++))
                continue
            fi
        fi
        echo -e "ID: ${YELLOW}$id${RESET}, Tanggal: ${BLUE}$date${RESET}, Kategori: ${BLUE}$category${RESET}, Jumlah: ${BLUE}$amount${RESET}, Deskripsi: ${BLUE}$description${RESET}"
        ((id++))
    done
}

#Summary expenses function
summary_expenses() {
    echo -e "${CYAN}-- Ringkasan Pengeluaran --${RESET}"
        read -rp "Masukkan bulan dan tahun (MM-YYYY) untuk ringkasan [kosong => semua]: " filter
        local total=0 count=0
        echo -e "\n${YELLOW}Pengeluaran yang dirangkum:${RESET}"
        for expense in "${expenseList[@]}"; do
                IFS='|' read -r date category amount description <<< "$expense"
                if [[ -n "$filter" ]]; then
                        expense_month_year=$(echo "$date" | awk -F'-' '{print $2"-"$3}')
                        if [[ "$expense_month_year" != "$filter" ]]; then
                                continue
                        fi
                fi
                echo -e "Tanggal: ${BLUE}$date${RESET}, Kategori: ${BLUE}$category${RESET}, Jumlah: ${BLUE}$amount${RESET}, Deskripsi: ${BLUE}$description${RESET}"
                total=$(awk "BEGIN {print $total + $amount}")
                count=$((count + 1))
        done
        echo -e "\n${BOLD}Jumlah entri:${RESET} $count"
        echo -e "${BOLD}Total:${RESET} ${RED}Rp $total${RESET}"
}

#main menu
while true; do
  echo -e "${GREEN}=== Expense Tracker Menu ===${RESET}"
  echo -e "${GREEN}1) Tambah Pengeluaran${RESET}"
  echo -e "${GREEN}2) Edit Pengeluaran${RESET}"
  echo -e "${GREEN}3) Hapus Pengeluaran${RESET}"
  echo -e "${GREEN}4) Daftar Pengeluaran${RESET}"
  echo -e "${GREEN}5) Ringkasan Pengeluaran${RESET}"
  echo -e "${GREEN}0) Keluar${RESET}"
  read -rp "Pilih opsi (0-5): " choice

    case $choice in
        1) add_expense ;;
        2) edit_expense ;;
        3) delete_expense ;;
        4) list_expenses ;;
        5) summary_expenses ;;
        0) echo -e "${YELLOW}Keluar dari aplikasi. Terima kasih!${RESET}"; exit 0 ;;
        *) echo -e "${YELLOW}Pilihan tidak valid. Silakan coba lagi.${RESET}" ;;
    esac
done

    