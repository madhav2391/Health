package com.example.demo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.ConsultationRecord;
import com.example.demo.models.Doctor;
import com.example.demo.repository.DoctorRepository;

@Service
public class DoctorServiceImpl implements DoctorService{

	@Autowired
	private DoctorRepository doctorRepository;

	@Override
	public List<Doctor> getAllDoctors() {
		return doctorRepository.findAll();
	}

	@Override
	public void addDoctor(Doctor doctor) {
		this.doctorRepository.save(doctor);
	}

	@Override
	public Doctor getDoctorById(long id) {
		Optional<Doctor> optional = doctorRepository.findById(id);
		Doctor doctor = null;
		if (optional.isPresent()) {
			doctor = optional.get();
		} else {
			throw new RuntimeException(" Doctor not found for id :: " + id);
		}
		return doctor;
	}

	@Override
	public void deleteDoctorById(long id) {
		this.doctorRepository.deleteById(id);
	}

	@Override
	public List<String> getallDoctorsByRole(String role) {
		List<Doctor> docs = new ArrayList<Doctor>();
		doctorRepository.findByRole(role).forEach(docs::add);
		for(Doctor x:docs) {
			System.out.println("get by type" + x.toString());
		}
		List<String> docnames = new ArrayList<String>();
		for(Doctor d:docs) {
			docnames.add(d.getFname());
		}
		return docnames;
	}
	
	@Override
	public List<String> getallDoctorsByHospitalId(long hospitalId) {
		List<Doctor> docs = new ArrayList<Doctor>();
		doctorRepository.findByHospitalId(hospitalId).forEach(docs::add);
		for(Doctor x:docs) {
			System.out.println("get by id" + x.toString());
		}
		List<String> docnames = new ArrayList<String>();
		for(Doctor d:docs) {
			docnames.add(d.getFname());
		}
		return docnames;
	}

}
