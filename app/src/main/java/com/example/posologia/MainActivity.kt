package com.example.posologia

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.posologia.ui.theme.PosologiaTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PosologiaTheme {
                // A surface container using the 'background' color from the theme
                Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    PosologiaPreview()
                }
            }
        }
    }
}

@Composable
fun Greeting(modifier: Modifier = Modifier) {
    Column(
        modifier = modifier
            .fillMaxWidth(1f),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = stringResource(R.string.titulo_inicial).uppercase(),
            textAlign = TextAlign.Center,
            modifier = modifier
                .fillMaxWidth(0.7f)
                .padding(start = 10.dp, end = 10.dp, top = 20.dp, bottom = 20.dp),
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
fun MedicalGridDisplay(remedy: String, date: String, modifier: Modifier = Modifier) {
    Column(
        modifier = modifier
            .fillMaxWidth(1f)
            .padding(bottom = 25.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = remedy.uppercase(),
            fontWeight = FontWeight.Bold
        )
        Text(text = date)
        Text(text = "Lembre-se de tomar seu remédio amanhã!")
    }
}

@Preview(showBackground = true)
@Composable
fun PosologiaPreview() {
    PosologiaTheme {
        Box(
            modifier = Modifier
                .fillMaxSize(1f)
        ) {
            Column {
                Greeting()
                MedicalGridDisplay("D'Orto","22/08/2023 - Segunda-Feira")
                MedicalGridDisplay("Alenia","22/08/2023 - Segunda-Feira")
            }
        }
    }
}