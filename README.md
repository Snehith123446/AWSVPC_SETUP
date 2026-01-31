# Secure & Scalable 3-Tier AWS Architecture (Production-Ready)

This repository documents the **design and implementation of a production-grade 3-tier application architecture on AWS**, built using a **custom VPC** and aligned with **AWS Well-Architected best practices**.

The primary focus of this project is **security, high availability, scalability, and clean network isolation**.

---
## 📌 Architecture Overview

The application follows a classic **3-Tier Architecture**:

- **Web Tier (Public Subnets)**  
  Public-facing Nginx frontend behind an Internet-facing Application Load Balancer

- **Application Tier (Private Subnets)**  
  Dockerized backend services behind an Internal Load Balancer with Auto Scaling

- **Database Tier (Private Subnets)**  
  Managed MongoDB-compatible **Amazon DocumentDB**, deployed in Multi-AZ

All tiers are deployed across **multiple Availability Zones** for fault tolerance and resilience.

---

## Architecture Diagram

![Architecture Diagram](architecture-diagram.png)

---

## 🌐 Network Design

### VPC Configuration
- **CIDR Block:** `10.250.0.0/24`
- **Region:** `us-east-2 (Ohio)`

### Subnet Design

| Tier | Subnet | CIDR | AZ |
|----|----|----|----|
| Web | Public-Web-AZ1 | 10.250.0.0/27 | us-east-2a |
| Web | Public-Web-AZ2 | 10.250.0.32/27 | us-east-2b |
| App | Private-App-AZ1 | 10.250.0.64/27 | us-east-2a |
| App | Private-App-AZ2 | 10.250.0.96/27 | us-east-2b |
| DB | Private-DB-AZ1 | 10.250.0.128/27 | us-east-2a |
| DB | Private-DB-AZ2 | 10.250.0.160/27 | us-east-2b |

---

## 🔐 Security Design

- Internet traffic is allowed **only** to the **External Load Balancer**
- Web Tier communicates with App Tier **only via Internal Load Balancer**
- Database is accessible **only from the Application Tier**
- **No inbound internet access** to private subnets
- IAM roles follow **least privilege principle**
- Backend containers pull images securely from **ECR using VPC Endpoints**
- Secrets managed using **AWS Secrets Manager**

---

## ⚙️ AWS Services Used

- Amazon VPC
- Application Load Balancers (External & Internal)
- Auto Scaling Groups (Web & App tiers)
- Amazon EC2 & Custom AMIs
- Amazon ECR + VPC Endpoints
- Amazon DocumentDB (MongoDB Compatible)
- IAM Roles & Security Groups

---


## Deployment Flow

User
↓
Internet
↓
External Application Load Balancer
↓
Web Tier (Nginx)
↓
Internal Load Balancer
↓
Application Tier (Docker Containers)
↓
Amazon DocumentDB
---
----

## ⚠️ Known Limitations

- Frontend image loading issue due to proxy configuration (non-blocking)
- HTTPS and WAF are not yet enabled

---

## 🚀 Future Enhancements

- Enable HTTPS using AWS ACM
- Add AWS WAF for security
- Implement CloudWatch alarms & centralized logging
- Provision entire infrastructure using **Terraform**

---

## 👤 Author

**Snehith Armoor**  
DevOps & Cloud Enthusiast  
