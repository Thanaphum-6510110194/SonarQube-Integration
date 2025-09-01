pipeline {
  agent any

  options {
    // กัน checkout ซ้ำกับ Declarative: Checkout SCM
    skipDefaultCheckout(true)
  }

  tools {
    nodejs 'nodejs-lts'  // ต้องตรงกับ Global Tool Configuration
  }

  stages {
    stage('Checkout') {
      steps {
        // ใช้ HTTPS จะไม่ติด known_hosts
        git branch: 'main', url: 'https://github.com/Thanaphum-6510110194/SonarQube-Integration.git'
      }
    }

    stage('Build') {
      steps {
        sh 'npm ci'
      }
    }

    stage('SonarQube Scan') {
      steps {
        // *** ชื่อให้ตรงกับที่ตั้งไว้ใน Manage Jenkins > System > SonarQube servers ***
        withSonarQubeEnv('sonarqube-25.8.0.112029') {
          // ไม่ต้องใส่ -Dsonar.host.url/-Dsonar.token เอง ปลั๊กอินจะฉีด ENV ให้
          sh '''
            npx @sonar/scan \
              -Dsonar.projectKey=SonarQube-Integration-with-Jenkins \
              -Dsonar.projectName=SonarQube-Integration-with-Jenkins \
              -Dsonar.sources=.
          '''
        }
      }
    }

    stage('Quality Gate') {
      steps {
        timeout(time: 5, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
  }
}
