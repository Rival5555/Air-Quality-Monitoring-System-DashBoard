export const legalContent = {
    terms: {
        title: "Terms of Service",
        content: `
### 1. Acceptance of Terms
By accessing and using this Air Quality Monitoring System ("the System"), you accept and agree to be bound by the terms and provision of this agreement.

### 2. Use License
This project is provided for educational and research purposes. You are free to view and analyze the data presented on this dashboard.

### 3. Service Availability
We do not guarantee that the System will be available at all times. The service may be interrupted for maintenance, updates, or technical issues related to IoT sensor connectivity.

### 4. User Conduct
You agree not to misuse the System or help anyone else to do so. This includes attempting to disrupt the service, access the underlying backend without authorization, or flood the system with requests.
        `
    },
    privacy: {
        title: "Privacy Policy",
        content: `
### 1. Data Collection
We collect environmental data (Temperature, Humidity, Air Quality Index, Gas Levels) transmitted by our IoT sensors. This data is stored in our database for historical analysis.

### 2. Personal Information
This System does not require user registration or the collection of personally identifiable information (PII) for public access. If you are an administrator, your authentication details are managed securely via Firebase Authentication.

### 3. Cookies and Local Storage
We use local storage only to save your user interface preferences (e.g., Dark Mode settings). No tracking cookies are used for advertising purposes.

### 4. Data Sharing
The environmental data collected is open for research and analysis. We do not sell any data to third parties.
        `
    },
    disclaimer: {
        title: "Disclaimer",
        content: `
### 1. Accuracy of Data
The data presented on this dashboard is collected from experimental IoT sensors (e.g., MQ-135, DHT11/22). **It is NOT certified for industrial safety or medical use.**
While we strive for accuracy, sensor readings can be affected by calibration drift, environmental factors, and hardware limitations.

### 2. Not for Life Safety
**DO NOT rely on this System for critical safety decisions.**
If you suspect a gas leak, fire, or hazardous air quality levels that pose an immediate threat to health or safety, evacuate immediately and contact emergency services.

### 3. "As Is" Basis
The System is provided "as is," with all faults, and without warranty of any kind, express or implied, including the warranties of merchantability or fitness for a particular purpose.
        `
    }
};
